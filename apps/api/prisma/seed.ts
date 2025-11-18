import { PrismaClient, EventType, ScheduleKind, ModuleName } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const now = new Date();
  const start = new Date(now.getTime() + 2 * 60 * 60 * 1000); // +2h
  const end = new Date(start.getTime() + 4 * 60 * 60 * 1000); // +4h

  // Workspace + entitlement
  const ws = await prisma.workspace.upsert({
    where: { id: 'demo-workspace' },
    update: {},
    create: { id: 'demo-workspace', name: 'Demo Workspace' },
  });
  await prisma.moduleEntitlement.upsert({
    where: { workspaceId_module: { workspaceId: ws.id, module: ModuleName.PRODUCTION } },
    update: { status: 'active', plan: 'demo' },
    create: { workspaceId: ws.id, module: ModuleName.PRODUCTION, plan: 'demo', status: 'active' },
  });

  // Event (id is stable for links)
  const ev = await prisma.event.upsert({
    where: { id: 'demo-event' },
    update: {},
    create: {
      id: 'demo-event',
      workspaceId: ws.id,
      name: 'Demo Concert – The Examples',
      type: EventType.CONCERT,
      startAt: start,
      endAt: end,
      location: 'Example Hall',
    },
  });

  const main = await prisma.stage.upsert({
    where: { id: 'demo-stage-main' },
    update: { name: 'Main Stage' },
    create: { id: 'demo-stage-main', eventId: ev.id, name: 'Main Stage' },
  });
  const second = await prisma.stage.upsert({
    where: { id: 'demo-stage-second' },
    update: { name: 'Second Stage' },
    create: { id: 'demo-stage-second', eventId: ev.id, name: 'Second Stage' },
  });

  // Schedule items
  const doorsStart = new Date(start.getTime() + 30 * 60 * 1000);
  const perf1Start = new Date(start.getTime() + 60 * 60 * 1000);
  const perf1End = new Date(perf1Start.getTime() + 60 * 60 * 1000);
  const changeStart = perf1End;
  const changeEnd = new Date(changeStart.getTime() + 20 * 60 * 1000);
  const perf2Start = changeEnd;
  const perf2End = new Date(perf2Start.getTime() + 75 * 60 * 1000);

  await prisma.scheduleItem.upsert({
    where: { id: 'demo-doors' },
    update: {},
    create: { id: 'demo-doors', eventId: ev.id, title: 'Doors', kind: ScheduleKind.DOORS, startAt: doorsStart, endAt: perf1Start, notes: 'FOH ready at -30' },
  });
  await prisma.scheduleItem.upsert({
    where: { id: 'demo-perf-1' },
    update: {},
    create: { id: 'demo-perf-1', eventId: ev.id, stageId: main.id, title: 'The Examples', kind: ScheduleKind.PERFORMANCE, startAt: perf1Start, endAt: perf1End, artist: 'The Examples' },
  });
  await prisma.scheduleItem.upsert({
    where: { id: 'demo-change' },
    update: {},
    create: { id: 'demo-change', eventId: ev.id, stageId: main.id, title: 'Changeover', kind: ScheduleKind.CHANGEOVER, startAt: changeStart, endAt: changeEnd },
  });
  await prisma.scheduleItem.upsert({
    where: { id: 'demo-perf-2' },
    update: {},
    create: { id: 'demo-perf-2', eventId: ev.id, stageId: main.id, title: 'Headliner', kind: ScheduleKind.PERFORMANCE, startAt: perf2Start, endAt: perf2End, artist: 'Headliner' },
  });

  // A couple of tasks
  await prisma.task.upsert({
    where: { id: 'demo-task-1' },
    update: {},
    create: { id: 'demo-task-1', eventId: ev.id, stageId: main.id, title: 'Soundcheck main stage', description: 'PA + monitors', },
  });
  await prisma.task.upsert({
    where: { id: 'demo-task-2' },
    update: {},
    create: { id: 'demo-task-2', eventId: ev.id, stageId: second.id, title: 'Backline setup', description: 'Kit + amps', },
  });

  console.log('Seeded demo workspace and event: demo-event');
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});


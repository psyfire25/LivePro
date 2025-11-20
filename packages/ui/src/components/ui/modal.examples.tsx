import { useState } from "react";
import { Modal, Button } from "@repo/ui";

// Example 1: Basic Modal
export function BasicModalExample() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Open Basic Modal</Button>

            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Basic Modal"
            >
                <p>This is a basic modal with a title and content.</p>
            </Modal>
        </>
    );
}

// Example 2: Modal with Footer Actions
export function ModalWithFooterExample() {
    const [isOpen, setIsOpen] = useState(false);

    const handleSave = () => {
        // Do something
        setIsOpen(false);
    };

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Open Modal with Footer</Button>

            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Confirm Action"
                footer={
                    <div className="ui:flex ui:gap-3 ui:justify-end">
                        <Button variant="ghost" onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleSave}>
                            Save Changes
                        </Button>
                    </div>
                }
            >
                <p>Are you sure you want to save these changes?</p>
            </Modal>
        </>
    );
}

// Example 3: Different Sizes
export function ModalSizesExample() {
    const [size, setSize] = useState<"sm" | "md" | "lg" | "xl" | "full">("md");
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="ui:flex ui:gap-2 ui:flex-wrap">
                {(["sm", "md", "lg", "xl", "full"] as const).map((s) => (
                    <Button
                        key={s}
                        onClick={() => {
                            setSize(s);
                            setIsOpen(true);
                        }}
                    >
                        Open {s.toUpperCase()} Modal
                    </Button>
                ))}
            </div>

            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title={`${size.toUpperCase()} Modal`}
                size={size}
            >
                <p>This is a {size} sized modal.</p>
                <p className="ui:mt-4">
                    Resize your browser to see how the modal adapts to different screen sizes.
                </p>
            </Modal>
        </>
    );
}

// Example 4: Modal without Close Button
export function NoCloseButtonExample() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>
                Open Modal (No Close Button)
            </Button>

            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Important Notice"
                showCloseButton={false}
                closeOnBackdropClick={false}
                footer={
                    <Button variant="primary" onClick={() => setIsOpen(false)}>
                        I Understand
                    </Button>
                }
            >
                <p>This modal requires you to click the button to close it.</p>
                <p className="ui:mt-2">
                    The backdrop click and ESC key are disabled for this example.
                </p>
            </Modal>
        </>
    );
}

// Example 5: Form in Modal
export function FormModalExample() {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "" });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        setIsOpen(false);
        setFormData({ name: "", email: "" });
    };

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Open Form Modal</Button>

            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Contact Information"
                size="lg"
                footer={
                    <div className="ui:flex ui:gap-3 ui:justify-end">
                        <Button
                            variant="ghost"
                            onClick={() => {
                                setIsOpen(false);
                                setFormData({ name: "", email: "" });
                            }}
                        >
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </div>
                }
            >
                <form onSubmit={handleSubmit} className="ui:space-y-4">
                    <div>
                        <label
                            htmlFor="name"
                            className="ui:block ui:text-sm ui:font-medium ui:mb-1"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                            className="ui:w-full ui:px-3 ui:py-2 ui:border ui:border-gray-300 dark:ui:border-gray-600 ui:bg-white dark:ui:bg-slate-900 ui:text-black dark:ui:text-white ui:rounded-md focus:ui:outline-none focus:ui:ring-2 focus:ui:ring-blue-500 dark:focus:ui:ring-blue-400"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="ui:block ui:text-sm ui:font-medium ui:mb-1"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                            className="ui:w-full ui:px-3 ui:py-2 ui:border ui:border-gray-300 dark:ui:border-gray-600 ui:bg-white dark:ui:bg-slate-900 ui:text-black dark:ui:text-white ui:rounded-md focus:ui:outline-none focus:ui:ring-2 focus:ui:ring-blue-500 dark:focus:ui:ring-blue-400"
                            placeholder="Enter your email"
                        />
                    </div>
                </form>
            </Modal>
        </>
    );
}

// Example 6: Scrollable Content
export function ScrollableModalExample() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>
                Open Modal with Long Content
            </Button>

            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Terms and Conditions"
                footer={
                    <Button variant="primary" onClick={() => setIsOpen(false)}>
                        Accept
                    </Button>
                }
            >
                <div className="ui:space-y-4">
                    {Array.from({ length: 20 }, (_, i) => (
                        <p key={i}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                            enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                        </p>
                    ))}
                </div>
            </Modal>
        </>
    );
}

import React from "react";

interface SideLayoutProps {
	children: React.ReactNode;
	side: "start" | "end" | "between";
}
const SideLayout: React.FC<SideLayoutProps> = ({ children, side }) => {
	const sideClasses = {
		start: "justify-start",
		end: "justify-end",
		between: "justify-between",
	};

	return (
		<div className={`flex items-center ${sideClasses[side]}`}>
			{React.Children.map(children, (child) => {
				if (React.isValidElement(child)) {
					return (
						<div key={child?.key} className="mx-[5px]">
							{child}
						</div>
					);
				} else {
					return <div className="mx-[5px]">{child}</div>;
				}
			})}
		</div>
	);
};

export default SideLayout;

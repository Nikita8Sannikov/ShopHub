import React from "react";
import "./style.css";
interface SideLayoutProps {
	children: React.ReactNode;
	side: "start" | "end" | "between";
}
const SideLayout: React.FC<SideLayoutProps> = ({ children, side }) => {
	return (
		<div className={`SideLayout_${side}`}>
			{React.Children.map(children, (child) => {
				if (React.isValidElement(child)) {
					return (
						<div key={child?.key} className="SideLayout-item">
							{child}
						</div>
					);
				} else {
					return <div className="SideLayout-item">{child}</div>;
				}
			})}
		</div>
	);
};

export default SideLayout;

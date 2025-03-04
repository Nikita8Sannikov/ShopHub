import React from "react";

interface PageLayoutProps {
	children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
	return (
		<div className="PageLayout">
			<div className="PageLayout-content">{children}</div>
		</div>
	);
};

export default PageLayout;

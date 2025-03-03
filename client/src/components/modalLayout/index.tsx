import "./styles.css";
interface ModalLayoutProps {
	title: string;
	onClose: () => void;
	children: React.ReactNode;
}
const ModalLayout: React.FC<ModalLayoutProps> = (props) => {
	return (
		<div className="ModalLayout">
			<div className="ModalLayout-frame">
				<div className="ModalLayout-head">
					<h5 className="ModalLayout-title">{props.title}</h5>
					<button
						className="ModalLayout-close"
						onClick={props.onClose}
						type="button"
						data-dismiss="ModalLayout"
					>
						Close
					</button>
				</div>
				<div className="ModalLayout-content">{props.children}</div>
			</div>
		</div>
	);
};

export default ModalLayout;

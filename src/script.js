import FrontPart from './components/FrontPart/FrontPart';
import './style.scss';
import { createRoot } from 'react-dom/client';
// Block Name
function FrontEnd({ attributes, setAttributes }) {
	return (
		<>
			<FrontPart
				attributes={attributes}
				setAttributes={setAttributes}
			></FrontPart>
		</>
	);
}

const container = document.querySelectorAll('.wp-block-aib-hello');
container?.forEach(ele => {
	const attributes = JSON.parse(ele.dataset.attributes);
	const root = createRoot(ele);
	ele.removeAttribute("data-attributes");
	root.render(<FrontEnd attributes={attributes} />);
})
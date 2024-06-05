import { useEffect } from 'react';
import Settings from './components/Backend/Settings/Settings';
import Backend from './components/Backend/Backend';
import { withSelect } from '@wordpress/data';

const Edit = props => {
	const { attributes, setAttributes, clientId, device } = props;

	useEffect(() => { clientId && setAttributes({ cId: clientId.substring(0, 10) }); }, [clientId]);

	return (
		<>
			<Settings attributes={attributes} setAttributes={setAttributes} />

			<Backend
				attributes={attributes}
				setAttributes={setAttributes}
				device={device}
			></Backend>

		</>
	)
};
export default withSelect((select) => {
	return {
		device: select('core/edit-post').__experimentalGetPreviewDeviceType()?.toLowerCase()
	}
})(Edit);
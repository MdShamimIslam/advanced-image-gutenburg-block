import { withSelect } from "@wordpress/data";

import ContentSettings from "./ContentSettings/ContentSettings";
import StyleSettings from "./StyleSettings/StyleSettings";

const Settings = ({attributes,setAttributes,device}) => {
    return <>
        <ContentSettings attributes={attributes} setAttributes={setAttributes} device={device}/>

		<StyleSettings attributes={attributes}	setAttributes={setAttributes} device={device} />
    </>
};
export default withSelect((select) => {
return {
	device: select('core/edit-post').__experimentalGetPreviewDeviceType()?.toLowerCase()
}
})(Settings);
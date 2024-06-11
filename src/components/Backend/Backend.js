import { withSelect } from "@wordpress/data";
import Styles from "../Styles/Styles";
import { FaImage, bootIcn } from "../../utils/icons";
import { FormFileUpload } from "@wordpress/components";
import { Button } from "@wordpress/components";
import { MediaUpload, RichText } from "@wordpress/block-editor";
import { produce } from "immer";

const Backend = ({ attributes, setAttributes, featureMediaURL,device }) => {
  const { cId, handleImg } = attributes;
  const {
    customImg,
    siteLogo,
    featuredImg,
    imgURL,
    displayCaption,
    customEditingMode,
    captionStyles,
    imgSrcOptionType

  } = handleImg;
  // update value of property
  const updateValueOfProperty = (
    property,
    value,
    childProp = false,
    child2Prop = false
  ) => {
    const newValueOfProperty = produce(handleImg, (draft) => {
      if (false !== childProp && false !== child2Prop) {
        draft[property][childProp][child2Prop] = value;
      } else if (false !== childProp) {
        draft[property][childProp] = value;
      } else {
        draft[property] = value;
      }
    });
    setAttributes({ handleImg: newValueOfProperty });
  };
  // update image source
  const updatedImg = (property, value) => {
    const changeImgValue = produce(handleImg, (draft) => {
      draft[property] = value;
      draft.imgSrcOptionType = 'custom';
    });
    setAttributes({ handleImg: changeImgValue });
  };
 
  // update image source
  const updatedImg2 = (property, value) => {
    const changeImgValue = produce(handleImg, (draft) => {
      draft[property] = value;
      draft.imgSrcOptionType = 'featured';
    });
    setAttributes({ handleImg: changeImgValue });
  };
  // upload and set image
  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const updateImageSrc = produce(handleImg, (draft) => {
          if (customImg) {
            draft.imgURL = reader.result;
            draft.customEditingMode = false;
          }
          if (siteLogo) {
            draft.logoSrc = reader.result;
            draft.logoEditingMode = false;
          }
        });
        setAttributes({ handleImg: updateImageSrc });
      };
      reader.readAsDataURL(file);
    }
  };
  // handle media upload image
  const handleMediaSelect = (media) => {
    const updateImageSrc = produce(handleImg, (draft) => {
      if (customImg) {
        draft.imgURL = media.url;
        draft.customEditingMode = false;
      }
      if (siteLogo) {
        draft.logoURL = media.url;
        draft.logoEditingMode = false;
      }
    });
    setAttributes({ handleImg: updateImageSrc });
  };


  return (
    <>
      {/* Style part */}
      <Styles attributes={attributes} featureMediaURL={featureMediaURL} isBackend={true} device={device}></Styles>
      {/* Backend part */}
      <div className="back"  id={`mainWrapper-${cId}`}>
        {/* Show source image */}
        <div>
          {!customImg && !featuredImg ? (
            <div>
              <p className="imgSource">Choose Your Image Source</p>
              <div className="images">
                {/* custom img */}
                <div
                  onClick={() => updatedImg("customImg", true)}
                  className="imgChild"
                >
                  <div>
                    <FaImage />
                  </div>
                  <p className="imgText">Custom Image</p>
                </div>
                {/* featured img */}
                <div
                  className="imgChild"
                  onClick={() => updatedImg2("featuredImg", true)}
                >
                  <div>{bootIcn}</div>
                  <p className="imgText" style={{ marginTop: "-7px" }}>
                    Featured Image
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {/* Custom Image */}
              <div>
                { imgSrcOptionType === "custom" && customImg &&  (
                  <div>
                  {
                    // display media/gallery image upload
                     !imgURL && customEditingMode ? (
                      <div>
                        <p style={{ fontSize: "24", fontWeight: "bold" }}>
                          Upload Image
                        </p>
                        <FormFileUpload
                          accept="image/*"
                          onChange={handleFileChange}
                          render={({ openFileDialog }) => (
                            <div>
                              <small>
                                Drag media file, upload or select image from
                                your library.
                              </small>
                              <br />
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Button
                                  title="Upload image from file"
                                  style={{
                                    marginTop: "10px",
                                    color: "white",
                                    background: "#4527a4",
                                  }}
                                  isSecondary
                                  onClick={openFileDialog}
                                >
                                  Upload
                                </Button>

                                <MediaUpload
                                  onSelect={handleMediaSelect}
                                  render={({ open }) => (
                                    <Button
                                      title="Add image from Media"
                                      onClick={open}
                                      style={{
                                        background: "#4527a4",
                                        color: "white",
                                        height: "35px",
                                        width: "50px",
                                        marginTop: "10px",
                                        marginLeft: "7px",
                                      }}
                                      icon={"upload f317"}
                                    ></Button>
                                  )}
                                ></MediaUpload>
                              </div>
                            </div>
                          )}
                        />
                      </div>
                    ) : (
                      // display image
                      <div className="image-container">
                        <div className="imgChildCon">
                          <div className="imgSrc">
                            <img src={imgURL} alt="image" />
                            {/* <div className='disPar' > */}
                            {displayCaption && (
                              <div className="disCaption">
                                <RichText
                                  tagName="p"
                                  value={captionStyles.text}
                                  onChange={(v) =>
                                    updateValueOfProperty(
                                      "captionStyles",
                                      v,
                                      "text"
                                    )
                                  }
                                  placeholder="Add Caption..."
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  }
                 
                </div>
                )
              }
              </div>
              {/* Featured Image*/}
              <div>
                {imgSrcOptionType === "featured" && featuredImg &&  (
                  <div >
                    {
                      featureMediaURL ?
                      <div className="ftr-image-container">
                        <div className="ftr-imgChildCon">
                          <div className="featurePar">
                            <img src={featureMediaURL} alt="Feature-image" />
                          </div>
                        </div>
                      </div>
                        :
                      <div>
                        <h3 style={{color:"red"}}>Warning !!!</h3>
                        <p>Seems like you have not added a Featured Image for this post. Please make sure to add a Featured Image and try again.</p>
                      </div>
                    }
                    
                  </div>
                )
              }
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default withSelect((select, props) => {
  const { layout } = props.attributes;
  const { size } = layout;

  const mediaID =
    select("core/editor").getEditedPostAttribute("featured_media");
  const mediaObj = select("core").getMedia(mediaID);
  const featureMediaURL =
    mediaObj?.media_details?.sizes[size]?.source_url || mediaObj?.source_url;
  // console.log(mediaObj);

  return {
    featureMediaURL,
  };
})(Backend);

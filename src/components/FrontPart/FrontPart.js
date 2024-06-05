
import Styles from "../Styles/Styles";

const FrontPart = ({ attributes, featureMediaURL }) => {
  const { cId, handleImg } = attributes;
  const {
    customImg,
    featuredImg,
    imgURL,
    displayCaption,
    imgSrcOptionType,
    enableLink, enableLinkText, enableNewTab, captionStyles, ftrEnableNewTab, ftrEnableLink, ftrEnableLinkText
  } = handleImg;


  return (
    <>
      {/* Style part */}
      <Styles
        attributes={attributes}
        featureMediaURL={featureMediaURL}
      ></Styles>
      {/* FrontPart part */}
      <div id={`mainWrapper-${cId}`}>
        <div>
          {/* Custom Image */}
          <div>
            {imgSrcOptionType === "custom" && customImg && (
              <div>
                <div className="image-container">
                  <div className="imgChildCon">
                    <div className="imgSrc">
                      <img
                        src={imgURL}
                        alt="image"
                        onClick={() => (enableLink && enableLinkText) ? window.open(`${enableLinkText}`, enableNewTab ? '_blank' : '_self') : {}}
                      />
                      <div>
                        {displayCaption && (
                          <div className="disCaption">
                            <p
                              dangerouslySetInnerHTML={{ __html: `${captionStyles.text}` }}
                              placeholder="Add Caption..."
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Featured Image*/}
          <div>
            {imgSrcOptionType === "featured" && featuredImg && (
              <div>
                {featureMediaURL &&
                  <div className="ftr-image-container">
                    <div className="ftr-imgChildCon">
                      <div className="featurePar">
                        <img
                          src={featureMediaURL}
                          alt="Feature-image"
                          onClick={() => (ftrEnableLink && ftrEnableLinkText) ? window.open(`${ftrEnableLinkText}`, ftrEnableNewTab ? '_blank' : '_self') : {}}
                        />
                      </div>
                    </div>
                  </div>
                }
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FrontPart;
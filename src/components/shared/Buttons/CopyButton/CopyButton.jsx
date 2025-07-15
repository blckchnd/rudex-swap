import { SVG_Copy } from '@components/utils/SVG';
import './copy-button.scss';
import StatusText from '@components/StatusMain/StatusSection/shared/StatusText/StatusText';

const CopyButton = ({ copy, copyId, classText = '' }) => {
  const clickCopy = () => {
    const focusText = () => {
      const element = document.getElementById(copyId);
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNode(element);
      selection.removeAllRanges();
      selection.addRange(range);
    };

    navigator.clipboard
      .writeText(copy)
      .then(() => focusText(copyId))
      .catch((err) => console.log(err));
  };

  return (
    <article className="copy-button">
      <button className="copy-button__button" onClick={clickCopy}>
        <SVG_Copy classSvg={'copy-button__svg'} />
      </button>
      <StatusText text={copy} id={copyId} className={classText} />
    </article>
  );
};

export default CopyButton;

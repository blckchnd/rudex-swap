import './features-card.scss';
import { useEffect, useState } from 'react';
import card1 from '@images/cards/card1.png';
import card2 from '@images/cards/card2.png';

const positionX = ['left', 'right'];
const positionY = ['top', 'bottom'];
const randomImg = [card1, card2];

const FeaturesCard = ({ item }) => {
  const [style, setStyle] = useState({});
  const randomPosition = (textArray) => {
    return textArray[Math.floor(Math.random() * textArray.length)];
  };

  useEffect(() => {
    setStyle({
      backgroundPositionX: randomPosition(positionX),
      backgroundPositionY: randomPosition(positionY),
      backgroundImage: `url(${randomPosition(randomImg)})`,
    });
  }, []);

  return (
    <li
      style={{
        backgroundPositionX: style.backgroundPositionX,
        backgroundPositionY: style.backgroundPositionY,
        backgroundImage: style.backgroundImage,
      }}
      className={`features-card ${item?.IMG}`}
    >
      <h3 className="features-card__title">{item?.TITLE}</h3>
      <span className="features-card__subtitle">{item?.SUBTITLE}</span>
    </li>
  );
};

export default FeaturesCard;

import React from 'react';
import '../../styles/Deals.css';

const DealCard = ({ deal, onClick }) => {
  return (
    <div className={`dc deal deal-${deal.category}`} onClick={() => onClick(deal)}>
      <div className={`cs ${deal.tagClass}`}></div>
      <div className="cb2">
        <div className="ct">
          <div className="clog" style={deal.logoStyle}>
            {deal.logo}
          </div>
          <div className="cbdg">
            {deal.tag && <span className={`bg ${deal.bgClass}`}>{deal.tag}</span>}
            <span className="bg bg-g">ACTIVE</span>
          </div>
        </div>
        <div className="cin">
          <div className="ccat">{deal.categoryName}</div>
          <div className="cn">{deal.name}</div>
          <div className="cdesc">{deal.description}</div>
        </div>
        <div className="cdbox">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="dof">{deal.offer}</span>
            <span className="dsub">{deal.subText}</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span className="dsave">{deal.savings}</span>
            <div className="dred">
              <span className="dg5"></span>Verified Deal
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealCard;

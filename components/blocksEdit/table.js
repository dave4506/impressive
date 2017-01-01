import React, { PropTypes } from 'react';
import b from './block.css';
import s from './table.css';

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {style,table,modifiers,header,description,title,onModifier} = this.props;
    return <div style={style} className={`${b["block"]} ${b["block__standard-width"]} ${s["block-table"]}`} >
      <p className={`${b["block-title"]}`}>{title}</p>
      <div className={`${s["block-table-wrapper"]}`}>
        {table.map((t,i)=>{
          if(t.custom)
            return <div key={i} className={`${s["block-table-row"]}`}>
              {t.component}
            </div>
          return <div key={i} className={`${s["block-table-row"]}`}>
            <p className={`${s["block-table-row-text"]}`}>{t.text}</p>
            <p className={`${s["block-table-row-subtext"]}`}>{t.subtext}</p>
            <div className={`${s["block-table-row-modifier"]}`}>
              {modifiers.map((m,i)=>{
                return <button key={i} onClick={()=>{onModifier(m,i)}}>{m}</button>
              })}
            </div>
          </div>
        })}
      </div>
      <p className={`${b["block-caption"]}`}>{description}</p>
    </div>
  }
}

export default Table

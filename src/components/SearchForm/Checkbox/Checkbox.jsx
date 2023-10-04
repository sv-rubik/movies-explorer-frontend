import './Checkbox.css';

function Checkbox() {

  return (
    <div className="checkbox">
      <label className="checkbox__label">
        <input className="checkbox__input" type="checkbox" />
        <span className="checkbox__slider"></span>
      </label>
    </div>
  );
};

export default Checkbox;

import React from "react";
import { curves } from "./Curves";


class CurveSelector extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      selectedOption: this.props.whichCurve
    }
  }

  handleChange(event) {
    this.props.onSelectionChange(event.target.value);
    this.setState({ selectedOption: event.target.value });
  }

  render() {
    const curvesKV = Array.from(curves.entries());
    const listItems = curvesKV.map(kv =>
      <div key={kv[0]}>
        <label>
          <input
            type="radio"
            value={kv[0]}
            checked={this.state.selectedOption === kv[0]}
            onChange={this.handleChange}
          />
          {kv[1].eqstring}
        </label><br />
      </div>
    );

    return(
      <div>
        {listItems}
      </div>
    );
  }
}

export default CurveSelector;

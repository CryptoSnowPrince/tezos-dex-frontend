import React, { Component } from "react";
import ReactTooltip from "react-tooltip";

const TOOLTIP_HIDE_TIME = 3000;

export default class Tooltip extends Component<any> {
  componentDidMount() {
    // window.addEventListener("scroll", this.hideTooltip);
    if (this.props.showInitial) {
      this.showTooltip();
    }
    setTimeout(() => {
      this.hideTooltip();
    }, TOOLTIP_HIDE_TIME);
  }
  componentWillUnmount() {
    //window.removeEventListener("scroll", this.hideTooltip);
  }

  showTooltip() {
    setTimeout(() => {
      let tooltip = document.querySelectorAll(`[data-tip][data-for="${this.props.id}"]`)[0];
      ReactTooltip.show(tooltip);
    }, 200);
  }
  hideTooltip() {
    setTimeout(() => {
      let tooltip = document.querySelectorAll(`[data-tip][data-for="${this.props.id}"]`)[0];
      ReactTooltip.hide(tooltip);
    }, 1200);
  }
  render() {
    const { children, showInitial, ...props } = this.props;
    if (!children) return null;

    return (
      <ReactTooltip className={"bg-errorBorder"} {...props}>
        {children}
      </ReactTooltip>
    );
  }
}

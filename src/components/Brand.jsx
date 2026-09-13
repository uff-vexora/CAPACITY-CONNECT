import { AppIcon } from "./AppIcon";

export function Brand() {
  return (
    <div className="brand">
      <span className="brand-mark">
        <AppIcon name="Layers3" size={19} />
      </span>
      <span>
        CAPACITY
        <br />
        <b>CONNECT</b>
      </span>
    </div>
  );
}

import React from "react";

const FinanceRow = ({
  prefix = '',
  title,
  amount,
  color = 'default',
}) => {
  return <div className="row">
      <div className="col-12 col-md-6 text-left font-weight-bold">
        {prefix + ' '}
        <span className={`text-${color}`}>{title}</span>:
      </div>
      <div className="col-12 col-md-6 text-right">
        $<span className={`text-${color}`}>{sanitizeNumber(amount, title)}</span>
      </div>
    </div>;
};

export default FinanceRow;

const sanitizeNumber = number => {
  if (typeof number !== 'number') debugger;
  if (typeof number !== 'number') return;
  var parts = number
    .toFixed(2)
    .toString()
    .split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  parts[1] = parts[1].padEnd(2, 0);
  return parts.join('.');
};

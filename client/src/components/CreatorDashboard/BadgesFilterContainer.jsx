import React from 'react';

function BadgesFilterContainer ({
  badhesParams,
  creatorFilter,
  changePredicate,
}) {
  const mapBadhesParams = b =>
    creatorFilter[b.name] && (
      <li key={b.name}>
        <span>{b.label}</span>
        <button
          onClick={() => {
            changePredicate({
              name: b.name,
              values: b.defaultValue,
            });
          }}
        >
          X
        </button>
      </li>
    );
  return <ul>{badhesParams.map(mapBadhesParams)}</ul>;
}

export default BadgesFilterContainer;

/* eslint-disable react/prop-types */
import "../styles/Characters.scss";

export default function Characters({ data, onClick }) {
  return (
    <div className="characters">
      {data.map((dataItem) => {
        console.log("dataItem: ", dataItem);
        return (
          <div
            key={dataItem.id}
            className="characterCard"
            style={{
              //  Some characters has no images.Empty description data comes from the API
              background: `url(${dataItem.thumbnail.path}.${dataItem.thumbnail.extension}) no-repeat center`,
              backgroundSize: "cover",
            }}
            onClick={() => onClick(dataItem.id)}
          >
            <div className="caption">{dataItem.name}</div>
            <div className="caption bottom">
              {/* Some characters has no description.Empty description data comes from the API */}
              {dataItem.description ? dataItem.description : "View Comics"}
            </div>
          </div>
        );
      })}
    </div>
  );
}

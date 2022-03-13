import './App.css';
function TopPage(props) {
  return (
    <div>
      <h1>{props.Header}</h1>
      <p>
        {props.BodyText}
      </p>
    </div>
  );
}

export default TopPage;

import { Link } from "react-router-dom"



import Dev from '../../../Illustration/dev.svg'



const Development = () => {
    return (
      <div
        style={{
          width: "80vw",
        }}
      >
        <img
          style={{
            marginTop: "20vh",
            marginLeft: "18vw",
            width: "50vw",
            height: "50vh",
          }}
          src={Dev}
        />

        <div style={{
            textAlign: "center",
            marginLeft: "7vw"
        }}>
          <h2> Тут можно оставить идеи как нам улучшить платформу: <Link to='/idea/new'> ссылка</Link></h2>
        </div>
      </div>
    );
}



export default Development
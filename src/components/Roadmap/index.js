

let ideas = [
  {
    title: "hahah lol",
    like: 3,
    user: "fullname",
  },

  {
    title: "hahah nooo",
    like: 1,
    user: "hah mda",
  },
  {
    title: "hahah nooo",
    like: 1,
    user: "hah mda",
  },
  {
    title: "фичу мне запили",
    like: 5,
    user: "gawr gura",
  },
];

const Roadmap = () => {
    return (
      <div>
        <div>
          <h2>roadmap</h2>

        </div>
        {/* NAVIGATION */}
        <div>
            <p>Идеи</p>
            <p>в работе</p>
            <p>Готво</p>
        </div>


{/* NEW IDEAS  */}
            <div>
                {ideas
                .filter(idea => idea.status == 202)
                .map(idea => {
                    return (
                        <div style={{color: 'red'}}>
                            {idea.title}
                        </div>
                    )
                })}

            </div>

      </div>
    );
}



export default Roadmap
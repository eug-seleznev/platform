import { useDispatch } from "react-redux";




let ideas_arr = {
  new:[],
  progress: [],
  done: []
}




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



const New = () => {
  const dispatch = useDispatch();
  
    return (
      <div>
        <h2>new ideas</h2>
        <div>
          {ideas.map(idea => {
            return (
              <div>
                <p onClick={}>like button</p>
                <p> {idea.title} / likes {idea.like}</p>
              </div>
            )
          })}
        </div>
      </div>
    );
}

export default New


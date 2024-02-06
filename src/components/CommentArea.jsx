import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";
import { useState, useEffect } from "react";

const CommentArea = function (props) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchComments = () => {
      setIsLoading(true);

      fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" + props.asin,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWMyMmYxMGRlMzdiYzAwMWEwYmZlMDUiLCJpYXQiOjE3MDcyMjQ4NDgsImV4cCI6MTcwODQzNDQ0OH0.DCoAfZD0GVIS8SnaP-WLpuqTt34FZWae77Z0zNWNZFo",
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch comments");
          }
          return response.json();
        })
        .then((comments) => {
          setComments(comments);
          setIsLoading(false);
          setIsError(false);
        })
        .catch((error) => {
          console.error("Error fetching comments:", error);
          setIsLoading(false);
          setIsError(true);
        });
    };
    fetchComments(); // Chiamata della funzione fetchComments
  }, [props.asin]);

  return (
    <div className="text-center">
      {isLoading && <Loading />}
      {isError && <Error />}
      <AddComment asin={props.asin} />
      <CommentList commentsToShow={comments} />
    </div>
  );
};

export default CommentArea;

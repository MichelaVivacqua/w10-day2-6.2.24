import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

const AddComment = function (props) {
  const [comment, setComment] = useState({
    comment: "",
    rate: 1,
    elementId: props.asin,
  });

  useEffect(() => {
    const fetchComments = () => {
      fetch("https://striveschool-api.herokuapp.com/api/comments", {
        method: "POST",
        body: JSON.stringify(comment),
        headers: {
          "Content-type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWMyMmYxMGRlMzdiYzAwMWEwYmZlMDUiLCJpYXQiOjE3MDcyMjQ4NDgsImV4cCI6MTcwODQzNDQ0OH0.DCoAfZD0GVIS8SnaP-WLpuqTt34FZWae77Z0zNWNZFo",
        },
      })
        .then((response) => {
          if (response.ok) {
            alert("Recensione inviata!");

            setComment({
              comment: "",
              rate: 1,
              elementId: props.asin,
            });
          } else {
            throw new Error("Qualcosa è andato storto");
          }
        })
        .catch((error) => {
          alert(error);
        });
    };

    fetchComments();
  }, [comment, props.asin]);

  return (
    <div className="my-3">
      <Form>
        <Form.Group className="mb-2">
          <Form.Label>Recensione</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci qui il testo"
            value={comment.comment}
            onChange={(e) =>
              setComment({
                ...comment,
                comment: e.target.value,
              })
            }
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Valutazione</Form.Label>
          <Form.Control
            as="select"
            value={comment.rate}
            onChange={(e) =>
              setComment({
                comment: {
                  ...comment,
                  comment: e.target.value,
                },
              })
            }
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Invia
        </Button>
      </Form>
    </div>
  );
};

export default AddComment;

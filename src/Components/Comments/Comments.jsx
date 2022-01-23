import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Comments({ postId, blogId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const showDateTime = (datetime) => {
    const months = [
      "January",
      "Fenbruary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const iso = new Date();
    const month = iso.getMonth();
    const day = iso.getDate();
    const hours = iso.getHours();
    const minutes = iso.getMinutes();
    const year = iso.getFullYear();
    const time = `${months[month]} ${day}, ${year} ${hours}:${minutes}`;
    return time;
  };
  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts/${postId}/comments?key=AIzaSyAzwuZ42Al8cxZVICkgIgKLCRJzZTtCf30`
      )
      .then((res) => {
        // console.log(res);
        if (res.data.items) {
          setComments(res.data.items);
        }
      })
      .then(() => {
        setLoading(false);
      });
  }, [blogId, postId]);
  return (
    <div>
      <section className="gradient-custom">
        <div className="container my-5 py-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-12 col-lg-10 col-xl-8">
              <div className="card">
                <div className="card-body p-4">
                  <h4 className="text-center mb-4 pb-2">Comment Section</h4>
                  {!loading &&
                    comments.map((commentData) => {
                      if (commentData.inReplyTo) {
                        return null;
                      }
                      return (
                        <div className="row" key={commentData.id}>
                          <div className="col">
                            <div className="d-flex flex-start">
                              <img
                                className="rounded-circle shadow-1-strong me-3"
                                src={commentData.author.image.url}
                                alt="avatar"
                                width="40"
                                height="40"
                              />
                              <div className="flex-grow-1 flex-shrink-1">
                                <div>
                                  <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1">
                                      {commentData.author.displayName}

                                      <span className="small">
                                        - {showDateTime(commentData.updated)}
                                      </span>
                                    </p>
                                  </div>
                                  <p className="small mb-0">
                                    {commentData.content}
                                  </p>
                                </div>
                                {comments.map((comment) => {
                                  if (
                                    comment.inReplyTo &&
                                    comment.inReplyTo.id === commentData.id
                                  ) {
                                    return (
                                      <div
                                        key={comment.id}
                                        className="d-flex flex-start mt-4"
                                      >
                                        <a className="me-3" href="#">
                                          <img
                                            className="rounded-circle shadow-1-strong"
                                            src={comment.author.image.url}
                                            alt="avatar"
                                            width="40"
                                            height="40"
                                          />
                                        </a>
                                        <div className="flex-grow-1 flex-shrink-1">
                                          <div>
                                            <div className="d-flex justify-content-between align-items-center">
                                              <p className="mb-1">
                                                {comment.author.displayName}
                                                <span className="small">
                                                  -{" "}
                                                  {showDateTime(
                                                    comment.updated
                                                  )}
                                                </span>
                                              </p>
                                            </div>
                                            <p className="small mb-0">
                                              {comment.content}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  }
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

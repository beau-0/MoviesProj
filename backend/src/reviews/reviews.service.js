const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties.js");

const addCriticDetails = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

function read(reviewId) {
  return knex("reviews")
    .select("*")
    .where("reviews.review_id", reviewId)
    .first();
}

function destroy(reviewId) {
  return knex("reviews").where("review_id", reviewId).del();
}

async function update(updatedReview) {
  return knex("reviews")
    .where("review_id", updatedReview.review_id)
    .update(updatedReview)
    .then(() =>
      knex("reviews as r")
        .join("critics as c", "r.critic_id", "c.critic_id")
        .where("r.review_id", updatedReview.review_id)
        .first()
        .then((data) => addCriticDetails(data))
    );
}

module.exports = {
  read,
  destroy,
  update,
};

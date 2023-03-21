"use strict";

/**
 * comment controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::comment.comment", ({ strapi }) => ({
  async create(ctx) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.badRequest(null, [
        { messages: [{ id: "No authorization header was found" }] },
      ]);
    }
    const response = await super.create(ctx);
    const updatedResponse = await strapi.entityService.update(
      "api::comment.comment",
      response.data.id,
      { data: { user: user.id } }
    );
    return updatedResponse;
  },
}));

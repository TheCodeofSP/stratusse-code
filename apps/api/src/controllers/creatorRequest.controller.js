const {
  createCreatorRequestSchema,
  rejectCreatorRequestSchema,
} = require("../validations/creatorRequest.validation");

const {
  createCreatorRequest,
  getPendingCreatorRequests,
  approveCreatorRequest,
  rejectCreatorRequest,
  getMyCreatorRequest,
  getCreatorRequestById,
  getCreatorRequestHistory,
} = require("../services/creatorRequest.service");

const create = async (req, res) => {
  try {
    const parsedBody = createCreatorRequestSchema.safeParse(req.body);

    if (!parsedBody.success) {
      return res.status(400).json({
        message: parsedBody.error.issues[0].message,
      });
    }

    const request = await createCreatorRequest(req.user._id, parsedBody.data);

    return res.status(201).json({
      message: "Demande envoyée.",
      request,
    });
  } catch (error) {
    if (error.message === "PENDING_REQUEST_ALREADY_EXISTS") {
      return res.status(409).json({
        message: "Une demande est déjà en attente.",
      });
    }

    if (error.message === "FORBIDDEN") {
      return res.status(403).json({
        message: "Vous ne pouvez pas faire cette demande.",
      });
    }

    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

const getPending = async (req, res) => {
  try {
    const requests = await getPendingCreatorRequests();

    return res.status(200).json(requests);
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

const approve = async (req, res) => {
  try {
    const { comment = "" } = req.body || {};

    const request = await approveCreatorRequest(
      req.params.id,
      req.user._id,
      comment,
    );

    return res.status(200).json({
      message: "Demande approuvée.",
      request,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

const reject = async (req, res) => {
  try {
    const parsedBody = rejectCreatorRequestSchema.safeParse(req.body);

    if (!parsedBody.success) {
      return res.status(400).json({
        message: parsedBody.error.issues[0].message,
      });
    }

    const request = await rejectCreatorRequest(
      req.params.id,
      req.user._id,
      parsedBody.data.rejectionReason,
      parsedBody.data.comment,
    );

    return res.status(200).json({
      message: "Demande refusée.",
      request,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

const getMine = async (req, res) => {
  try {
    const request = await getMyCreatorRequest(req.user._id);

    return res.status(200).json({
      request,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

const getById = async (req, res) => {
  try {
    const request = await getCreatorRequestById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Demande introuvable.",
      });
    }

    return res.status(200).json(request);
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

const getHistory = async (req, res) => {
  try {
    const requests = await getCreatorRequestHistory();

    return res.status(200).json(requests);
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

module.exports = {
  create,
  getPending,
  getHistory,
  getById,
  approve,
  reject,
  getMine,
};
const testController = (req, res) => {
    res.json({
      success: "This route is working"
    });
  };
  
  module.exports = { testController };
  
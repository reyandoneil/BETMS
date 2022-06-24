const { DataMonitor } = require('../models/index');
const client = require('../helper/init_redis');

class DataMonitorController {
  static async getAllData(req, res) {
    try {
      const redis_key = 'data';
      const getCacheData = await client.get(redis_key);
      if (getCacheData) {
        return res.json({
          source: 'cache',
          data: JSON.parse(getCacheData),
        });
      } else {
        const data = await DataMonitor.findAll();
        const newData = data.sort(function (a, b) {
          return a.createdAt - b.createdAt;
        });
        const totalData = data.length;
        client.SET(
          redis_key,
          JSON.stringify({
            response: {
              total_data: totalData,
              docs: newData,
            },
          }),
          {
            EX: 10,
            NX: true,
          }
        );
        return res.status(201).json({
          response: {
            total_data: totalData,
            docs: newData,
          },
        });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}

module.exports = DataMonitorController;

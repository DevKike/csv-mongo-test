import { app } from './app/app';
import { CONSTANT } from './config/constants/Constant';
import { dbConfig } from './config/db/dbConfig';

app.listen(CONSTANT.SERVER_PORT, async () => {
  try {
    await dbConfig.connect();
    console.log(`App is running on http://localhost:${CONSTANT.SERVER_PORT}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
});

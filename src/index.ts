import App from './app';
import { PostRoute } from './routes/posts/posts.route';

const app = new App([new PostRoute()]);

app.listen();

const { BlogPost } = require('../models/blogpost.model');

class BlogPostRepository {

    async getBlogPosts(filter){
        const posts = await BlogPost.find(filter);
        return posts;
    }

    async createBlogPost(blogpost) {
        let data = {};
        try {
            const post = await BlogPost.create(blogpost);
            data['_id'] = post._id;
        } catch (err) {
            console.log(`Error:::${err}`);
        }
        return data;
    }

    async updateBlogPost(blogpost) {
        let data = {};
        try {
            data = await BlogPost.updateOne(blogpost);
        } catch (err) {
            console.log(`Error:::${err}`);
        }
        return data;
    }

    async deleteBlogPost(blogpostId) {
        let data = {};
        try {
            data = await BlogPost.deleteOne({ _id: blogpostId });
        } catch (err) {
            console.log(`Error:::${err}`);
        }
        return { status: `${data.deletedCount > 0 ? true : false}` };
    }

}

module.exports = new BlogPostRepository();
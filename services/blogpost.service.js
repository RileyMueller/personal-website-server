const blogpostRepository = require('../repository/blogpost.repository');

class BlogPostService {

    async getBlogPosts(filter) {
        return await blogpostRepository.getBlogPosts(filter);
    }

    async createBlogPost(blogpost) {
        return await blogpostRepository.createBlogPost(blogpost);
    }

    async updateBlogPost(blogpost) {
        return await blogpostRepository.updateBlogPost(blogpost);
    }

    async deleteBlogPost(blogpostId) {
        return await blogpostRepository.deleteBlogPost(blogpostId);
    }
}

module.exports = new BlogPostService();
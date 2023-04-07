import profileReducer, { ProfileState, addPost } from "./profileReducer";

let initialState: ProfileState

beforeEach(() => {
     initialState = {
        posts: [
            { id: 1, message: "hey", likes: 5 },
            { id: 2, message: "yo", likes: 3 },
            { id: 3, message: "sup", likes: 15 },
            ],
            user: null,
            status: '',
            error: ''
      };
})

test('delete post', () => {
    let post = {
        id: 10,
        message: 'bonjure',
        likes: 33
    }

    let action = addPost(post)

    let state = profileReducer(initialState, action)
    expect(state.posts.length).toBe(4)
    //expect(state.posts[4].message).toBe('bonjure')

})
export const USER_FRAGMENT = `
    id
    username
    avatar
    firstName
    lastName
`;

export const FILE_FRAGMENT = `
        id
        url
`;

export const MESSAGE_FRAGMENT = `
        id
        text
        to{
            ${USER_FRAGMENT}
        }
        from{
            ${USER_FRAGMENT}
        }
`;

export const COMMENT_FRAGMENT = `
   fragment CommentParts on Comment{
        id
        text
        user{
            ${USER_FRAGMENT}
        }
    }
`;

export const ROOM_FRAGMENT = `
    fragment RoomParts on Room{
        id
        participants{
            ${USER_FRAGMENT}
        }
        messages{
            ${MESSAGE_FRAGMENT}
        }
    }
`;

export const PROFILE_FRAGMENT = `
    fragment ProfileParts on User{
        ${USER_FRAGMENT}
        bio
        following{
            ${USER_FRAGMENT}
        }
        followers{
            ${USER_FRAGMENT}
        }
        post{
            id
            files{
                ${FILE_FRAGMENT}
            }
        }
    }
`;

export const FULL_POST_USER_FRAGMENT = `
  fragment FullPostParts on User{
       ${USER_FRAGMENT}
        post{
            id
            files{
                ${FILE_FRAGMENT}
            }
        }
  }
`;

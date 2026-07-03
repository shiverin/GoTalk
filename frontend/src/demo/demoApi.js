import { IS_DEMO_MODE } from "./demoMode";

const STORAGE_KEY = "gotalk-demo-state-v1";
const STORAGE_VERSION = 1;

const daysAgo = (days) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
};

const seedState = () => ({
  version: STORAGE_VERSION,
  currentUserId: 1,
  users: [
    {
      id: 1,
      username: "demo_guest",
      email: "guest@gotalk.demo",
      avatarUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=demo_guest",
      achievements: 9,
      createdAt: daysAgo(112),
    },
    {
      id: 2,
      username: "maya_frontend",
      email: "maya@gotalk.demo",
      avatarUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=maya_frontend",
      achievements: 21,
      createdAt: daysAgo(520),
    },
    {
      id: 3,
      username: "kenny_go",
      email: "kenny@gotalk.demo",
      avatarUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=kenny_go",
      achievements: 14,
      createdAt: daysAgo(310),
    },
    {
      id: 4,
      username: "aisha_product",
      email: "aisha@gotalk.demo",
      avatarUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=aisha_product",
      achievements: 17,
      createdAt: daysAgo(742),
    },
  ],
  communities: [
    {
      id: 1,
      name: "react",
      description:
        "React patterns, UI polish, state management, and component architecture.",
      rules: "Share reproducible examples and be kind in reviews.",
      members: 48250,
      membersCount: 48250,
      onlineCount: 812,
      postsCount: 3,
      owner_id: 1,
      isPrivate: false,
      createdAt: daysAgo(540),
    },
    {
      id: 2,
      name: "golang",
      description:
        "Go services, APIs, concurrency, and clean backend design discussions.",
      rules: "Keep examples runnable and explain tradeoffs.",
      members: 31820,
      membersCount: 31820,
      onlineCount: 427,
      postsCount: 2,
      owner_id: 3,
      isPrivate: false,
      createdAt: daysAgo(690),
    },
    {
      id: 3,
      name: "studentbuilders",
      description:
        "A place for students turning course projects into portfolio-ready products.",
      rules: "Show progress, ask specific questions, and credit collaborators.",
      members: 12405,
      membersCount: 12405,
      onlineCount: 166,
      postsCount: 2,
      owner_id: 4,
      isPrivate: false,
      createdAt: daysAgo(210),
    },
    {
      id: 4,
      name: "webdev",
      description:
        "Frontend, backend, deployment, accessibility, and everyday web craft.",
      rules: "No spam. Include context when asking for debugging help.",
      members: 90515,
      membersCount: 90515,
      onlineCount: 1450,
      postsCount: 2,
      owner_id: 2,
      isPrivate: false,
      createdAt: daysAgo(1200),
    },
    {
      id: 5,
      name: "shipit",
      description:
        "Small launches, release notes, build logs, and the habit of finishing.",
      rules: "Celebrate launches and share what changed.",
      members: 8870,
      membersCount: 8870,
      onlineCount: 92,
      postsCount: 1,
      owner_id: 1,
      isPrivate: false,
      createdAt: daysAgo(95),
    },
  ],
  memberships: [1, 3, 5],
  votes: {
    "1:101": 1,
    "1:104": -1,
  },
  posts: [
    {
      id: 101,
      title: "What finally made React state click for you?",
      content:
        "I used to split every tiny interaction into its own hook. Lately I am getting better results by keeping one small state model close to the screen and deriving the rest.",
      link: "",
      authorId: 2,
      communityId: 1,
      score: 128,
      createdAt: daysAgo(1),
      updatedAt: daysAgo(1),
    },
    {
      id: 102,
      title: "Building a forum API in Go: what should I test first?",
      content:
        "I have auth, posts, comments, communities, memberships, and voting. I am trying to choose the highest-signal test coverage before polishing the UI.",
      link: "",
      authorId: 1,
      communityId: 2,
      score: 86,
      createdAt: daysAgo(2),
      updatedAt: daysAgo(2),
    },
    {
      id: 103,
      title: "Portfolio demo idea: static app with fake API calls",
      content:
        "For recruiters, the fastest path might be a static demo that shows the full product without requiring the original backend to be awake.",
      link: "https://vercel.com/docs",
      authorId: 4,
      communityId: 3,
      score: 214,
      createdAt: daysAgo(3),
      updatedAt: daysAgo(3),
    },
    {
      id: 104,
      title: "What belongs in a README after the app already works?",
      content:
        "I am trying to make READMEs less like installation checklists and more like product proof. Architecture, screenshots, feature matrix, and local setup all seem useful.",
      link: "",
      authorId: 3,
      communityId: 4,
      score: 72,
      createdAt: daysAgo(5),
      updatedAt: daysAgo(5),
    },
    {
      id: 105,
      title: "Tiny launch checklist for student projects",
      content:
        "Seeded data, guest mode, mobile screenshot, public deployment URL, and a short LinkedIn post beat a perfect backend nobody can access.",
      link: "",
      authorId: 1,
      communityId: 5,
      score: 161,
      createdAt: daysAgo(6),
      updatedAt: daysAgo(6),
    },
    {
      id: 106,
      title: "How do you keep comments readable in forum UIs?",
      content:
        "Indented threads are powerful, but flat comments are easier to scan. I am leaning toward clean flat discussion first, nested replies later.",
      link: "",
      authorId: 2,
      communityId: 1,
      score: 59,
      createdAt: daysAgo(9),
      updatedAt: daysAgo(9),
    },
    {
      id: 107,
      title: "SQLite to Postgres lessons from a course project",
      content:
        "The schema traveled well, but deployment forced me to think harder about environment variables, migrations, and seed data.",
      link: "",
      authorId: 3,
      communityId: 2,
      score: 118,
      createdAt: daysAgo(12),
      updatedAt: daysAgo(12),
    },
  ],
  comments: [
    {
      id: 1001,
      postId: 101,
      authorId: 1,
      username: "demo_guest",
      content: "Derived state helped me too. It keeps components calmer.",
      createdAt: daysAgo(1),
      updatedAt: daysAgo(1),
    },
    {
      id: 1002,
      postId: 101,
      authorId: 3,
      username: "kenny_go",
      content: "The moment it clicked was treating state as a small domain model.",
      createdAt: daysAgo(1),
      updatedAt: daysAgo(1),
    },
    {
      id: 1003,
      postId: 102,
      authorId: 2,
      username: "maya_frontend",
      content: "I would start with auth boundaries and post/comment CRUD.",
      createdAt: daysAgo(2),
      updatedAt: daysAgo(2),
    },
    {
      id: 1004,
      postId: 103,
      authorId: 1,
      username: "demo_guest",
      content: "This is exactly what this demo is exercising now.",
      createdAt: daysAgo(3),
      updatedAt: daysAgo(3),
    },
    {
      id: 1005,
      postId: 105,
      authorId: 4,
      username: "aisha_product",
      content: "Guest mode is underrated. People need to see the product immediately.",
      createdAt: daysAgo(4),
      updatedAt: daysAgo(4),
    },
  ],
  nextIds: {
    user: 5,
    community: 6,
    post: 108,
    comment: 1006,
  },
});

const loadState = () => {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const seeded = seedState();
    saveState(seeded);
    return seeded;
  }

  try {
    const parsed = JSON.parse(raw);
    if (parsed.version !== STORAGE_VERSION) throw new Error("stale demo state");
    return parsed;
  } catch {
    const seeded = seedState();
    saveState(seeded);
    return seeded;
  }
};

const saveState = (state) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const resetGoTalkDemoState = () => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seedState()));
};

const jsonResponse = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const textResponse = (body, status = 200) =>
  new Response(body, {
    status,
    headers: { "Content-Type": "text/plain" },
  });

const readJson = async (init) => {
  if (!init?.body) return {};
  if (typeof init.body === "string") return JSON.parse(init.body || "{}");
  return {};
};

const getUser = (state, id) => state.users.find((user) => user.id === Number(id));
const getCurrentUser = (state) => getUser(state, state.currentUserId);
const getCommunity = (state, id) =>
  state.communities.find((community) => String(community.id) === String(id));
const getPost = (state, id) => state.posts.find((post) => post.id === Number(id));
const commentsForPost = (state, postId) =>
  state.comments
    .filter((comment) => comment.postId === Number(postId))
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

const communityWithCounts = (state, community) => {
  const postCount = state.posts.filter((post) => post.communityId === community.id).length;
  const memberBump = state.memberships.includes(community.id) ? 1 : 0;
  return {
    ...community,
    members: community.members + memberBump,
    membersCount: community.membersCount + memberBump,
    postsCount: postCount,
  };
};

const feedItem = (state, post) => {
  const author = getUser(state, post.authorId);
  const community = getCommunity(state, post.communityId);
  const comments = commentsForPost(state, post.id);
  return {
    post,
    author: author?.username || "Unknown",
    community: community ? communityWithCounts(state, community) : null,
    comments,
    score: post.score ?? 0,
    commentsCount: comments.length,
  };
};

const listFeed = (state, filter = () => true) =>
  state.posts
    .filter(filter)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map((post) => feedItem(state, post));

const handleAuth = async (state, parts, method, init) => {
  const currentUser = getCurrentUser(state);

  if (parts[2] === "me" && method === "GET") return jsonResponse({ user: currentUser });
  if (parts[2] === "logout" && method === "POST") return jsonResponse({ user: currentUser });
  if (parts[2] === "login" && method === "POST") return jsonResponse({ user: currentUser });

  if (parts[2] === "register" && method === "POST") {
    const body = await readJson(init);
    return jsonResponse({
      message: "Demo registration accepted",
      user: { ...currentUser, username: body.username || currentUser.username },
      token: "demo-token",
    });
  }

  return jsonResponse({ error: "Unknown auth endpoint" }, 404);
};

const handlePosts = async (state, parts, method, init) => {
  if (parts.length === 2 && method === "GET") return jsonResponse(listFeed(state));

  if (parts.length === 2 && method === "POST") {
    const body = await readJson(init);
    const now = new Date().toISOString();
    const post = {
      id: state.nextIds.post++,
      title: body.title,
      content: body.content || "",
      link: body.link || "",
      communityId: Number(body.communityId),
      authorId: state.currentUserId,
      score: 1,
      createdAt: now,
      updatedAt: now,
    };
    state.posts.unshift(post);
    saveState(state);
    return jsonResponse(post, 201);
  }

  const postId = Number(parts[2]);
  const post = getPost(state, postId);
  if (!post) return jsonResponse({ error: "Post not found" }, 404);

  if (parts.length === 3 && method === "GET") {
    return jsonResponse({
      post,
      author: getUser(state, post.authorId),
      community: communityWithCounts(state, getCommunity(state, post.communityId)),
      comments: commentsForPost(state, post.id),
    });
  }

  if (parts.length === 3 && method === "PUT") {
    const body = await readJson(init);
    post.title = body.title ?? post.title;
    post.content = body.content ?? post.content;
    post.link = body.link ?? post.link;
    post.communityId = Number(body.communityId ?? post.communityId);
    post.updatedAt = new Date().toISOString();
    saveState(state);
    return jsonResponse(post);
  }

  if (parts.length === 3 && method === "DELETE") {
    state.posts = state.posts.filter((item) => item.id !== postId);
    state.comments = state.comments.filter((comment) => comment.postId !== postId);
    Object.keys(state.votes).forEach((key) => {
      if (key.endsWith(`:${postId}`)) delete state.votes[key];
    });
    saveState(state);
    return jsonResponse({ message: "Post deleted successfully" });
  }

  if (parts[3] === "comments" && method === "POST") {
    const body = await readJson(init);
    const currentUser = getCurrentUser(state);
    const now = new Date().toISOString();
    const comment = {
      id: state.nextIds.comment++,
      postId,
      authorId: currentUser.id,
      username: currentUser.username,
      content: body.content,
      createdAt: now,
      updatedAt: now,
    };
    state.comments.push(comment);
    saveState(state);
    return jsonResponse(comment, 201);
  }

  return jsonResponse({ error: "Unknown posts endpoint" }, 404);
};

const handleCommunities = async (state, parts, method, init) => {
  if (parts.length === 2 && method === "GET") {
    return jsonResponse(state.communities.map((community) => communityWithCounts(state, community)));
  }

  if (parts.length === 2 && method === "POST") {
    const body = await readJson(init);
    const community = {
      id: state.nextIds.community++,
      name: body.name?.replace(/^c\//, "") || "new-community",
      description: body.description || "",
      rules: body.rules || "",
      members: 1,
      membersCount: 1,
      onlineCount: 1,
      postsCount: 0,
      owner_id: state.currentUserId,
      isPrivate: Boolean(body.isPrivate),
      createdAt: new Date().toISOString(),
    };
    state.communities.unshift(community);
    state.memberships.push(community.id);
    saveState(state);
    return jsonResponse(community, 201);
  }

  if (parts[2] === "top" && method === "GET") {
    const limit = Number(parts[3] || 20);
    return jsonResponse(
      state.communities
        .map((community) => communityWithCounts(state, community))
        .sort((a, b) => b.members - a.members)
        .slice(0, limit)
    );
  }

  const communityId = Number(parts[2]);
  const community = getCommunity(state, communityId);
  if (!community) return jsonResponse({ error: "Community not found" }, 404);

  if (parts.length === 3 && method === "GET") {
    return jsonResponse(communityWithCounts(state, community));
  }

  if (parts.length === 3 && method === "DELETE") {
    state.communities = state.communities.filter((item) => item.id !== communityId);
    state.posts = state.posts.filter((post) => post.communityId !== communityId);
    state.memberships = state.memberships.filter((id) => id !== communityId);
    saveState(state);
    return jsonResponse({ message: "Community deleted successfully" });
  }

  if (parts[3] === "posts" && method === "GET") {
    return jsonResponse(listFeed(state, (post) => post.communityId === communityId));
  }

  if (parts[3] === "joined" && method === "GET") {
    return jsonResponse({ joined: state.memberships.includes(communityId), isMember: state.memberships.includes(communityId) });
  }

  if (parts[3] === "join" && method === "POST") {
    if (!state.memberships.includes(communityId)) state.memberships.push(communityId);
    saveState(state);
    return jsonResponse({ message: "Joined community successfully", joined: true });
  }

  if (parts[3] === "leave" && method === "POST") {
    state.memberships = state.memberships.filter((id) => id !== communityId);
    saveState(state);
    return jsonResponse({ message: "Left community successfully", joined: false });
  }

  return jsonResponse({ error: "Unknown communities endpoint" }, 404);
};

const handleUsers = (state, parts, method) => {
  const userId = Number(parts[2]);
  const user = getUser(state, userId);
  if (!user) return jsonResponse({ error: "User not found" }, 404);

  if (parts.length === 3 && method === "GET") return jsonResponse(user);

  if (parts[3] === "posts" && method === "GET") {
    return jsonResponse(listFeed(state, (post) => post.authorId === userId));
  }

  if (parts[3] === "comments" && method === "GET") {
    return jsonResponse(
      state.comments
        .filter((comment) => comment.authorId === userId)
        .map((comment) => ({ ...comment, username: user.username }))
    );
  }

  return jsonResponse({ error: "Unknown users endpoint" }, 404);
};

const handleComments = (state, parts, method) => {
  const commentId = Number(parts[2]);
  const comment = state.comments.find((item) => item.id === commentId);
  if (!comment) return jsonResponse({ error: "Comment not found" }, 404);

  if (method === "DELETE") {
    state.comments = state.comments.filter((item) => item.id !== commentId);
    saveState(state);
    return jsonResponse({ message: "Comment deleted successfully" });
  }

  return jsonResponse({ error: "Unknown comments endpoint" }, 404);
};

const handleVote = async (state, parts, method, init) => {
  if (method === "GET" && parts.length === 4) {
    const key = `${Number(parts[2])}:${Number(parts[3])}`;
    return jsonResponse({
      userId: Number(parts[2]),
      postId: Number(parts[3]),
      value: state.votes[key] || 0,
    });
  }

  const body = await readJson(init);
  const userId = Number(body.userId);
  const postId = Number(body.postId);
  const key = `${userId}:${postId}`;
  const post = getPost(state, postId);
  if (!post) return jsonResponse({ error: "Post not found" }, 404);

  const oldValue = state.votes[key] || 0;
  const newValue = method === "DELETE" ? 0 : Number(body.value || 0);

  if (newValue === 0) delete state.votes[key];
  else state.votes[key] = newValue;

  post.score += newValue - oldValue;
  saveState(state);

  return jsonResponse({
    userId,
    postId,
    value: newValue,
    score: post.score,
    message: newValue === 0 ? "Vote removed" : "Vote recorded",
  });
};

const handleRequest = async (url, init = {}) => {
  const state = loadState();
  const method = (init.method || "GET").toUpperCase();
  const parts = url.pathname.split("/").filter(Boolean);

  if (parts[0] !== "api") return textResponse("Not found", 404);

  if (parts[1] === "auth") return handleAuth(state, parts, method, init);
  if (parts[1] === "posts") return handlePosts(state, parts, method, init);
  if (parts[1] === "communities") return handleCommunities(state, parts, method, init);
  if (parts[1] === "users") return handleUsers(state, parts, method);
  if (parts[1] === "comments") return handleComments(state, parts, method);
  if (parts[1] === "vote") return handleVote(state, parts, method, init);

  return jsonResponse({ error: "Unknown demo API endpoint" }, 404);
};

export const installGoTalkDemoApi = () => {
  if (!IS_DEMO_MODE || typeof window === "undefined" || window.__gotalkDemoApiInstalled) return;

  resetGoTalkDemoStateIfMissing();

  const originalFetch = window.fetch.bind(window);
  window.fetch = async (input, init = {}) => {
    const requestUrl = typeof input === "string" ? input : input.url;
    const url = new URL(requestUrl, window.location.origin);

    if (url.pathname.startsWith("/api/")) {
      await new Promise((resolve) => window.setTimeout(resolve, 120));
      return handleRequest(url, init);
    }

    return originalFetch(input, init);
  };

  window.__gotalkDemoApiInstalled = true;
};

const resetGoTalkDemoStateIfMissing = () => {
  if (!window.localStorage.getItem(STORAGE_KEY)) resetGoTalkDemoState();
};

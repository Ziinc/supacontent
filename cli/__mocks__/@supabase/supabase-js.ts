export const session = jest.fn().mockReturnValue({ user: null });


export let client;

client = {
  auth: {
    signUp: jest.fn().mockResolvedValue({ user: {}, error: null }),
    session,
    onAuthStateChange() {
      return { data: null };
    },
    signInWithPassword: jest.fn().mockResolvedValue({ data: { session } })
  },
  from: jest.fn().mockImplementation(() => client),
  limit: jest.fn().mockImplementation(() => client),
  select: jest.fn().mockImplementation(() => client),
  filter: jest.fn().mockImplementation(() => client),
}

export const createClient = jest.fn().mockReturnValue(client);
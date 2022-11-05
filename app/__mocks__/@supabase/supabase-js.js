export const session = jest.fn().mockReturnValue({ user: null });

export const createClient = jest.fn().mockReturnValue({
  auth: {
    signUp: jest.fn().mockResolvedValue({ user: {}, error: null }),
    session,
    onAuthStateChange() {
      return { data: null };
    },
  },
});

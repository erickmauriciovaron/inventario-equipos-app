import type { SessionUser, User, UserRole } from "../../types/user";

const USERS_KEY = "inventory_users";
const SESSION_KEY = "inventory_session";

const defaultAdmin: User = {
  id: crypto.randomUUID(),
  username: "admin",
  password: "Admin123*",
  fullName: "Administrador",
  role: "admin",
  createdAt: new Date().toISOString(),
};

export const getStoredUsers = (): User[] => {
  const raw = localStorage.getItem(USERS_KEY);

  if (!raw) {
    localStorage.setItem(USERS_KEY, JSON.stringify([defaultAdmin]));
    return [defaultAdmin];
  }

  try {
    const users = JSON.parse(raw) as User[];
    if (!Array.isArray(users) || users.length === 0) {
      localStorage.setItem(USERS_KEY, JSON.stringify([defaultAdmin]));
      return [defaultAdmin];
    }
    return users;
  } catch {
    localStorage.setItem(USERS_KEY, JSON.stringify([defaultAdmin]));
    return [defaultAdmin];
  }
};

export const saveStoredUsers = (users: User[]): void => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const getCurrentSession = (): SessionUser | null => {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as SessionUser;
  } catch {
    return null;
  }
};

export const saveSession = (user: SessionUser): void => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
};

export const clearSession = (): void => {
  localStorage.removeItem(SESSION_KEY);
};

export const loginWithStoredUser = (
  username: string,
  password: string
): { success: boolean; message?: string; user?: SessionUser } => {
  const users = getStoredUsers();

  const foundUser = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!foundUser) {
    return {
      success: false,
      message: "Usuario o contraseña incorrectos.",
    };
  }

  const sessionUser: SessionUser = {
    id: foundUser.id,
    username: foundUser.username,
    fullName: foundUser.fullName,
    role: foundUser.role,
  };

  saveSession(sessionUser);

  return {
    success: true,
    user: sessionUser,
  };
};

export const createStoredUser = (payload: {
  username: string;
  password: string;
  fullName: string;
  role: UserRole;
}): { success: boolean; message?: string; user?: User } => {
  const users = getStoredUsers();

  const exists = users.some(
    (user) =>
      user.username.trim().toLowerCase() === payload.username.trim().toLowerCase()
  );

  if (exists) {
    return {
      success: false,
      message: "Ese nombre de usuario ya existe.",
    };
  }

  const newUser: User = {
    id: crypto.randomUUID(),
    username: payload.username.trim(),
    password: payload.password.trim(),
    fullName: payload.fullName.trim(),
    role: payload.role,
    createdAt: new Date().toISOString(),
  };

  const updatedUsers = [...users, newUser];
  saveStoredUsers(updatedUsers);

  return {
    success: true,
    user: newUser,
  };
};

export const getAllUsers = (): User[] => {
  return getStoredUsers();
};

export const updateStoredUserRole = (
  userId: string,
  role: UserRole
): { success: boolean; message?: string } => {
  const users = getStoredUsers();
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    return {
      success: false,
      message: "Usuario no encontrado.",
    };
  }

  users[userIndex] = {
    ...users[userIndex],
    role,
  };

  saveStoredUsers(users);

  const currentSession = getCurrentSession();
  if (currentSession && currentSession.id === userId) {
    saveSession({
      ...currentSession,
      role,
    });
  }

  return {
    success: true,
  };
};

export const deleteStoredUser = (
  userId: string
): { success: boolean; message?: string } => {
  const users = getStoredUsers();
  const userToDelete = users.find((user) => user.id === userId);

  if (!userToDelete) {
    return {
      success: false,
      message: "Usuario no encontrado.",
    };
  }

  const adminCount = users.filter((user) => user.role === "admin").length;

  if (userToDelete.role === "admin" && adminCount === 1) {
    return {
      success: false,
      message: "Debe existir al menos un administrador.",
    };
  }

  const updatedUsers = users.filter((user) => user.id !== userId);
  saveStoredUsers(updatedUsers);

  const currentSession = getCurrentSession();
  if (currentSession && currentSession.id === userId) {
    clearSession();
  }

  return {
    success: true,
  };
};
import prisma from './app';

export default async function Page() {
  try {
    const users = await prisma.user.findMany(); // Replace 'user' with your actual model name
    return (
      <div>
        <h1>Users</h1>
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name ?? user.email}</li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    console.error('Error fetching users:', error);
    return <div>Error fetching users. Check console for details.</div>;
  }
}
const UserHomePage = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const userId = (await params).userId;

  return (
    <div className="flex flex-1 w-full">
      <p>{userId}</p>
    </div>
  );
};

export default UserHomePage;

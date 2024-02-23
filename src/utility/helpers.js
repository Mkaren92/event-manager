export const sortedEvents = (data) => {
    const items = [...data];
    return items.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA;
    });
  };
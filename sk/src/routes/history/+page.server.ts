

export const load = async ({ locals }) => {
    const pb = locals.pb;

    const tasks = await pb.collection('records').getList(1, 50, {
        order: '-created',
        expand: 'user,task',
    });

    return {
        items: tasks.items
    }
}
import { AsyncResourceGroup, Resource, SequentialResourceGroup } from ".";


const TEST_TASKS = new SequentialResourceGroup([
   new AsyncResourceGroup([
      new Resource('Test Item 1', 'test-item-1')
   ]),
   new AsyncResourceGroup([
      new Resource('Test Item 2', 'test-item-2'),
      new Resource('Test Item 3', 'test-item-3')
   ]),
   new AsyncResourceGroup([
      new Resource('Test Item 4', 'test-item-4'),
      new Resource('Test Item 5', 'test-item-5'),
      new Resource('Test Item 6', 'test-item-6')
   ]),
   new AsyncResourceGroup([
      // new SequentialResourceGroup([
      //    new Resource('Test Item 7'),
      //    new AsyncResourceGroup([
      //       new Resource('Test Item 10'),
      //       new Resource('Test Item 11'),
      //       new Resource('Test Item 12')
      //    ])
      // ]),
      new Resource('Test Item 8', 'test-item-8'),
      new Resource('Test Item 9', 'test-item-9')
   ])
])

export default TEST_TASKS;
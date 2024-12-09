const formatDisk = (input: string) =>
  input.split("").reduce((disk, length, index) => {
    for (let i = 0; i < parseInt(length); i++) {
      if (index % 2 === 0) disk.push(index / 2);
      else disk.push(-1);
    }
    return disk;
  }, [] as number[]);

const orderDiskByBlock = (disk: number[]) => {
  let ordered = false;
  for (let i = disk.length - 1; i > -1; i--) {
    if (ordered) break;
    for (let j = 0; j < disk.length; j++) {
      if (i === j) ordered = true;
      if (disk[j] === -1) {
        disk[j] = disk[i];
        disk[i] = -1;
        break;
      }
    }
  }
  return disk;
};

const orderDiskByFile = (disk: number[]) => {
  const moved = [];
  for (let i = disk.length - 1; i > -1; i--) {
    if (disk[i] === -1 || disk[i + 1] === disk[i] || moved.includes(disk[i])) continue;
    const len = i - disk.indexOf(disk[i]) + 1;
    for (let j = 0; j < disk.length; j++) {
      if (j === i) break;
      if (disk[j] === -1) {
        const blocks = disk.slice(j, j + len);
        if (blocks.length === len && blocks.every((block) => block === -1)) {
          const removed = disk.splice(j, len, ...disk.slice(i - len + 1, i + 1));
          disk.splice(i - len + 1, len, ...removed);
          moved.push(disk[j]);
          break;
        }
      }
    }
  }
  return disk;
};

const diskTotal = (disk: number[]) => disk.reduce((count, block, index) => (block > -1 ? count + index * block : count));

export const diskFragmentPart1 = (input: string) => diskTotal(orderDiskByBlock(formatDisk(input)));
export const diskFragmentPart2 = (input: string) => diskTotal(orderDiskByFile(formatDisk(input)));

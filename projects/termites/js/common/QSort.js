function partition(array, begin, end, pivot)
{
    var piv = array[pivot].fitness;
    array.swap(pivot, end - 1);
    var store = begin;
    for (var ix = begin; ix < end-1; ++ix) {
        if (array[ix].fitness > piv) {
            array.swap(store, ix);
            ++store;
        }
    }
    array.swap(end - 1, store);

    return store;
}

Array.prototype.swap = function(a, b)
{
    var tmp = this[a];
    this[a] = this[b];
    this[b] = tmp;
};

function quickSort(array)
{
    qsort(array, 0, array.length);
}

function qsort(array, begin, end)
{
    if (end - 1 > begin) {
        var pivot = begin + Math.floor(Math.random() * (end - begin));
        pivot = partition(array, begin, end, pivot);
        qsort(array, begin, pivot);
        qsort(array, pivot + 1, end);
    }
}
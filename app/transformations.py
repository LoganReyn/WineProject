""" Features for Wine Quality Prediction. """

from abc import (ABC,
                abstractmethod)
import numpy as np

__all__ = [
        "wine_data", 
        "lable_prediction",
        ]

class _Feature(ABC):
    """ Abstract class for features in dataset """

    def __init__(self,
                 value,
                 dataMinimum,
                 dataMaximum) -> None:
        super().__init__()
        self.setDataMinimum(dataMinimum)
        self.setDataMaximum(dataMaximum)
        self.setValue(value)

    @abstractmethod
    def _transformations(self, v):
        """ 
        Used on value when class instantiated.
        Override for subclasses. 

        Feature Transformations Available 
        - minMax 
        - log
        """
        ...

    def _minMaxTransform(self, v):
        tMin = self.getDataMinimum()
        tMax = self.getDataMaximum()
        if tMax != tMin:
            return (v - tMin) / (tMax - tMin)
        return np.zeros_like(v)
    
    def _logTransform(self, v):
        return np.log(1 + v)

    def setValue(self, value):
        self.__value = np.array(value)
        self.__value = self._transformations(value)
    
    def setDataMinimum(self, value):
        self.__dataMinimum = value
    
    def setDataMaximum(self, value):
        self.__dataMaximum = value

    def getValue(self):
        return self.__value
    
    def getDataMinimum(self):
        return self.__dataMinimum
    
    def getDataMaximum(self):
        return self.__dataMaximum

class VolatileAcidity(_Feature):
    """ Transformations: Log Transformed, Min Maxed """

    def __init__(self, value, dataMinimum=0.12, dataMaximum=1.58) -> None:
        super().__init__(value, dataMinimum, dataMaximum)

    def _transformations(self, v):
        v = self._logTransform(v)
        v = self._minMaxTransform(v)
        return v

class Sulphates(_Feature):
    """ Transformations: Min Maxed """

    def __init__(self, value, dataMinimum=0.33, dataMaximum=2) -> None:
        super().__init__(value, dataMinimum, dataMaximum)

    def _transformations(self, v):
        v = self._minMaxTransform(v)
        return v

class Alchohol(_Feature):
    "Transformations: Min Maxed"
    
    def __init__(self, value, dataMinimum=8.4, dataMaximum=14.9) -> None:
        super().__init__(value, dataMinimum, dataMaximum)

    def _transformations(self, v):
        v = self._minMaxTransform(v)
        return v


def wine_data(volatile_acidity: float, 
                    sulphates: float, 
                    alcohol: float) -> np.ndarray:
    
    va = VolatileAcidity(volatile_acidity)
    slph = Sulphates(sulphates)
    alc = Alchohol(alcohol)

    data = np.array([va.getValue(), slph.getValue(), alc.getValue()])
    data = data.reshape(1, -1)
    return data


def label_prediction(mlModel, 
                     data: np.ndarray) -> str:
    lbls = {1: "Probably Good",
            0: "Probably Bad"}
    p = mlModel.predict(data)
    # p[0] since numpy array with
    # only one element
    return lbls[int(p[0])]



if __name__ == "__main__":
    # quick tests
    va = VolatileAcidity(1.58, 0.12, 1.58)
    slph = Sulphates(1, 0.33, 2)
    alc = Alchohol(10, 8.4, 14.9)

    f = [va, slph, alc]

    for _ in f:
        print(_.getValue())

    print(wine_data(1.58, 1, 10))

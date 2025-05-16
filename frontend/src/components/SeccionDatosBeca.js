// components/SeccionDatosBeca.js
import React from 'react';

export default function SeccionDatosBeca({ formData, handleChange, handleChangeDynamic, prevSection, nextSection, errores }) {
  return (
    <div className="form-section">
      <h2 className="section-title">Datos de Beca</h2>
      <div className="section-content">

        {/* Opción 1: Beca Cusur */}
        <div className="form-row checkbox-row">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="BECADO_CUSUR"
              checked={formData.BECADO_CUSUR}
              onChange={handleChange}
            /> 
          BECA CUSUR
          </label>
        </div>
        {formData.BECADO_CUSUR && (
          <div className="for">
            <label>
              MONTO OBTENIDO:
                <input 
                  type="number" 
                  name="MONTO_CUSUR" 
                  value={formData.MONTO_CUSUR} 
                  onChange={handleChange} 
                  placeholder="Monto en MXN"
                  required 
                />
              {errores.MONTO_CUSUR && <span className="error-message">{errores.MONTO_CUSUR}</span>}
            </label>
            <label>
              DETALLES EXTRAS:
                <textarea 
                  name="DETALLES_CUSUR" 
                  value={formData.DETALLES_CUSUR} 
                  onChange={handleChange} 
                  placeholder="Detalles adicionales sobre la beca"
                  rows="3"
                />
            </label>
          </div>
        )}
        
        {/* Opción 2: Becas CGCI */}
        <div className="form-row checkbox-row">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="BECADO_CGCI"
              checked={formData.BECADO_CGCI}
              onChange={handleChange}
            /> BECADO CGCI
          </label>
        </div>
        {formData.BECADO_CGCI && (
          <>
          <div className="form-row">
            <label>
              NÚMERO BECAS CGCI:
              <input
                type="number"
                name="NUMERO_BECAS_CGCI"
                value={formData.NUMERO_BECAS_CGCI}
                onChange={handleChange}
                placeholder="Número de becas"
                min="1"
                required 
              />
              {errores.NUMERO_BECAS_CGCI && <span className="error-message">{errores.NUMERO_BECAS_CGCI}</span>}
            </label>
          </div>
          {Array.from({ length: formData.NUMERO_BECAS_CGCI || 0 }).map((_, index) => (
          <div key={index} className="form-row">
            <label>
              TIPO DE BECA:
              <select 
                name={`TIPO_BECA_CGCI_${index}`} 
                value={formData[`TIPO_BECA_CGCI_${index}`] || ''} 
                onChange={(e) => handleChangeDynamic(e, index, 'TIPO_BECA_CGCI')}
                required
              >
                <option value="">SELECCIONE</option>
                <option value="PAEME">PAEME</option>
                <option value="AMES">AMES</option>
                <option value="ESACIES">ESACIES</option>
                <option value="OTRO">OTRO</option>
              </select>
            </label>
            {formData[`TIPO_BECA_CGCI_${index}`] === "OTRO" && (
              <label>
                NOMBRE DEL PROGRAMA:
                <input 
                  type="text" 
                  name={`NOMBRE_BECA_CGCI_${index}`} 
                  value={formData[`NOMBRE_BECA_CGCI_${index}`] || ''} 
                  onChange={(e) => handleChangeDynamic(e, index, 'NOMBRE_BECA_CGCI')}
                  placeholder="Nombre del programa"
                  required 
                />
              </label>
            )}
            <label>
              MONTO OBTENIDO:
              <input 
                type="number" 
                name={`MONTO_BECA_CGCI_${index}`} 
                value={formData[`MONTO_BECA_CGCI_${index}`] || ''} 
                onChange={(e) => handleChangeDynamic(e, index, 'MONTO_BECA_CGCI')}
                placeholder="Monto en MXN"
                required 
              />
            </label>
            <label>
              DETALLES EXTRAS:
              <textarea 
                name={`DETALLES_BECA_CGCI_${index}`} 
                value={formData[`DETALLES_BECA_CGCI_${index}`] || ''} 
                onChange={(e) => handleChangeDynamic(e, index, 'DETALLES_BECA_CGCI')}
                placeholder="Detalles adicionales"
                rows="3"
              />
            </label>
          </div>
          ))}
        </>
      )}
      {/* Opción 3: Beca Programa */}
      <div className="form-row checkbox-row">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="BECADO_PROGRAMA"
            checked={formData.BECADO_PROGRAMA}
            onChange={handleChange}
          /> 
          BECADO PROGRAMA
        </label>
      </div>
      {formData.BECADO_PROGRAMA && (
        <div className="form-row">
          <label>
            PROGRAMA:
            <input
              type="text"
              value={formData.PROGRAMA}
              readOnly 
              disabled 
            />
          </label>
          <label>
            MONTO OBTENIDO:
            <input 
              type="number" 
              name="MONTO_PROGRAMA" 
              value={formData.MONTO_PROGRAMA} 
              onChange={handleChange} 
              placeholder="Monto en MXN"
              required 
            />
          </label>
          <label>
            DETALLES EXTRAS:
            <textarea 
              name="DETALLES_PROGRAMA" 
              value={formData.DETALLES_PROGRAMA} 
              onChange={handleChange} 
              placeholder="Detalles adicionales sobre la beca"
              rows="3"
            />
          </label>
        </div>
      )}
      {/* Opción 4: Beca Externo */}
      <div className="form-row checkbox-row">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="BECADO_EXTERNO"
            checked={formData.BECADO_EXTERNO}
            onChange={handleChange}
          /> 
          BECADO EXTERNO
        </label>
      </div>
      {formData.BECADO_EXTERNO && (
        <> 
          <div className="form-row">
            <label>
              TIPO DE MOVILIDADD:
              <input
                type="text"
                value={formData.TIPO_DESTINO === "NACIONAL" ? "NACIONAL" : "INTERNACIONAL"} 
                readOnly 
                disabled 
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              ¿CUÁNTAS BECAS EXTERNAS TIENE?
              <input 
                type="number" 
                name="NUMERO_BECAS_EXTERNAS" 
                value={formData.NUMERO_BECAS_EXTERNAS} 
                onChange={handleChange} 
                placeholder="Número de becas externas"
                min="1"
                required 
              />
            </label>
          </div>  
          {Array.from({ length: formData.NUMERO_BECAS_EXTERNAS || 0 }).map((_, index) => (
            <div key={index} className="form-row">
              <label>
                NOMBRE DE LA BECA:
                <select 
                  name={`TIPO_BECA_EXTERNA_${index}`} 
                  value={formData[`TIPO_BECA_EXTERNA_${index}`] || ''} 
                  onChange={(e) => handleChangeDynamic(e, index, 'TIPO_BECA_EXTERNA')}
                  required
                >
                  <option value="">SELECCIONE</option>
                  {formData.TIPO_DESTINO === "NACIONAL" ? (
                    <>
                      <option value="BECA DE EXCELENCIA DE LA SEP">BECA DE EXCELENCIA DE LA SEP</option>
                      <option value="FIBERH">FIBERH</option>
                      <option value="FUNED">FUNED</option>
                      <option value="ALIANZA DEL PACIFICO">ALIANZA DEL PACIFICO</option>
                      <option value="OTRO">OTRO</option>
                    </>
                  ) : (
                    <>
                      <option value="DAAD">DAAD (Alemania)</option>
                      <option value="COMEXUS">COMEXUS (EE.UU)</option>
                      <option value="JASSO">JASSO (Japón)</option>
                      <option value="CAMPUS FRANCE">CAMPUS FRANCE (Francia)</option>
                      <option value="Erasmus+">Erasmus+ (Unión Europea)</option>
                      <option value="Chevening">Chevening (Reino Unido)</option>
                      <option value="OTRO">OTRO</option>
                    </>
                  )}
                </select>
              </label>
              {formData[`TIPO_BECA_EXTERNA_${index}`] === "OTRO" && (
                <label>
                  NOMBRE DEL PROGRAMA:
                  <input 
                    type="text" 
                    name={`NOMBRE_BECA_EXTERNA_${index}`} 
                    value={formData[`NOMBRE_BECA_EXTERNA_${index}`] || ''} 
                    onChange={(e) => handleChangeDynamic(e, index, 'NOMBRE_BECA_EXTERNA')}
                    placeholder="Nombre del programa"
                    required 
                  />
                </label>
              )}
              <label>
                MONTO OBTENIDO:
                <input 
                  type="number" 
                  name={`MONTO_BECA_EXTERNA_${index}`} 
                  value={formData[`MONTO_BECA_EXTERNA_${index}`] || ''} 
                  onChange={(e) => handleChangeDynamic(e, index, 'MONTO_BECA_EXTERNA')}
                  placeholder="Monto en MXN"
                  required 
                />
              </label>
              <label>
                DETALLES EXTRAS:
                <textarea 
                  name={`DETALLES_BECA_EXTERNA_${index}`} 
                  value={formData[`DETALLES_BECA_EXTERNA_${index}`] || ''} 
                  onChange={(e) => handleChangeDynamic(e, index, 'DETALLES_BECA_EXTERNA')}
                  placeholder="Detalles adicionales"
                  rows="3"
                />
              </label>
            </div>
          ))}
        </>
      )}
    </div>
      <div className="form-navigation">
        <button type="button" onClick={prevSection} className="prev-button">Anterior</button>
        <button type="button" onClick={nextSection} className="next-button">Siguiente</button>
      </div>
    </div>
  );
}
